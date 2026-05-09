import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as FileSystem from 'expo-file-system/legacy';
import { Ionicons } from '@expo/vector-icons';

const ROOT_DIR = FileSystem.documentDirectory ?? '';

type FileItem = {
  name: string;
  uri: string;
  exists: boolean;
  isDirectory: boolean;
  size?: number;
  modificationTime?: number;
};

type ModalMode = 'folder' | 'file' | 'edit' | 'view' | 'info' | null;

type DiskStats = {
  total: number;
  free: number;
  used: number;
};

const getExtension = (name: string): string => {
  const parts = name.split('.');
  return parts.length > 1 ? parts.pop()?.toLowerCase() ?? 'без розширення' : 'без розширення';
};

const ensureTxtName = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) return '';
  return trimmed.toLowerCase().endsWith('.txt') ? trimmed : `${trimmed}.txt`;
};

const joinPath = (base: string, name: string): string => {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${name}`;
};

const formatBytes = (bytes?: number): string => {
  if (bytes === undefined || Number.isNaN(bytes)) return 'невідомо';
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
};

const formatDate = (unixSeconds?: number): string => {
  if (!unixSeconds) return 'невідомо';
  return new Date(unixSeconds * 1000).toLocaleString('uk-UA');
};

export default function App() {
  const [currentDir, setCurrentDir] = useState(ROOT_DIR);
  const [items, setItems] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [diskStats, setDiskStats] = useState<DiskStats | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedItem, setSelectedItem] = useState<FileItem | null>(null);
  const [nameInput, setNameInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  const relativePath = useMemo(() => {
    if (!currentDir || currentDir === ROOT_DIR) return 'Головна папка';
    return currentDir.replace(ROOT_DIR, '').replace(/\/$/, '') || 'Головна папка';
  }, [currentDir]);

  const loadDiskStats = useCallback(async () => {
    try {
      const [total, free] = await Promise.all([
        FileSystem.getTotalDiskCapacityAsync(),
        FileSystem.getFreeDiskStorageAsync(),
      ]);
      setDiskStats({ total, free, used: total - free });
    } catch {
      setDiskStats(null);
    }
  }, []);

  const loadDirectory = useCallback(async () => {
    if (!currentDir) return;

    try {
      setLoading(true);
      const rootInfo = await FileSystem.getInfoAsync(currentDir);
      if (!rootInfo.exists) {
        await FileSystem.makeDirectoryAsync(currentDir, { intermediates: true });
      }

      const names = await FileSystem.readDirectoryAsync(currentDir);
      const result = await Promise.all(
        names.map(async (name) => {
          const uri = joinPath(currentDir, name);
          const info = await FileSystem.getInfoAsync(uri, { size: true });
          return {
            name,
            uri,
            exists: info.exists,
            isDirectory: info.exists ? info.isDirectory === true : false,
            size: info.exists && !info.isDirectory ? info.size : undefined,
            modificationTime: info.exists ? info.modificationTime : undefined,
          };
        })
      );

      result.sort((a, b) => {
        if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
        return a.name.localeCompare(b.name, 'uk');
      });

      setItems(result);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося зчитати поточну директорію.');
    } finally {
      setLoading(false);
    }
  }, [currentDir]);

  useEffect(() => {
    loadDirectory();
    loadDiskStats();
  }, [loadDirectory, loadDiskStats]);

  const openCreateFolder = () => {
    setNameInput('');
    setContentInput('');
    setSelectedItem(null);
    setModalMode('folder');
  };

  const openCreateFile = () => {
    setNameInput('');
    setContentInput('');
    setSelectedItem(null);
    setModalMode('file');
  };
const createFolder = async () => {
  const folderName = nameInput.trim();

  if (!folderName) {
    Alert.alert('Помилка', 'Введіть назву папки.');
    return;
  }

  if (/[\\/:*?"<>|]/.test(folderName)) {
    Alert.alert('Помилка', 'Назва папки не повинна містити символи: / \\ : * ? " < > |');
    return;
  }

  try {
    const uri = joinPath(currentDir, folderName);
    const info = await FileSystem.getInfoAsync(uri);

    if (info.exists) {
      Alert.alert('Помилка', 'Об’єкт із такою назвою вже існує.');
      return;
    }

    await FileSystem.makeDirectoryAsync(uri, { intermediates: true });
    setModalMode(null);
    await loadDirectory();
  } catch (error) {
    console.log('Create folder error:', error);
    Alert.alert('Помилка', 'Не вдалося створити папку.');
  }
};

  const createFile = async () => {
    const fileName = ensureTxtName(nameInput);
    if (!fileName) {
      Alert.alert('Помилка', 'Введіть назву файлу.');
      return;
    }

    try {
      const uri = joinPath(currentDir, fileName);
      const info = await FileSystem.getInfoAsync(uri);
      if (info.exists) {
        Alert.alert('Помилка', 'Файл із такою назвою вже існує.');
        return;
      }
      await FileSystem.writeAsStringAsync(uri, contentInput, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      setModalMode(null);
      await loadDirectory();
      await loadDiskStats();
    } catch {
      Alert.alert('Помилка', 'Не вдалося створити файл.');
    }
  };

  const openItem = async (item: FileItem) => {
    if (item.isDirectory) {
      setCurrentDir(item.uri.endsWith('/') ? item.uri : `${item.uri}/`);
      return;
    }

    if (getExtension(item.name) !== 'txt') {
      Alert.alert('Файл', 'Для перегляду доступні тільки .txt файли.');
      return;
    }

    try {
      const text = await FileSystem.readAsStringAsync(item.uri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      setSelectedItem(item);
      setContentInput(text);
      setModalMode('view');
    } catch {
      Alert.alert('Помилка', 'Не вдалося відкрити файл.');
    }
  };

  const openEdit = async (item: FileItem) => {
    if (item.isDirectory || getExtension(item.name) !== 'txt') {
      Alert.alert('Редагування', 'Редагувати можна тільки текстові .txt файли.');
      return;
    }

    try {
      const text = await FileSystem.readAsStringAsync(item.uri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      setSelectedItem(item);
      setContentInput(text);
      setModalMode('edit');
    } catch {
      Alert.alert('Помилка', 'Не вдалося зчитати файл для редагування.');
    }
  };

  const saveEditedFile = async () => {
    if (!selectedItem) return;

    try {
      await FileSystem.writeAsStringAsync(selectedItem.uri, contentInput, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      setModalMode(null);
      await loadDirectory();
      await loadDiskStats();
    } catch {
      Alert.alert('Помилка', 'Не вдалося зберегти зміни.');
    }
  };

  const openInfo = (item: FileItem) => {
    setSelectedItem(item);
    setModalMode('info');
  };

  const deleteItem = (item: FileItem) => {
    Alert.alert(
      'Підтвердження видалення',
      `Видалити ${item.isDirectory ? 'папку' : 'файл'} "${item.name}"?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            try {
              await FileSystem.deleteAsync(item.uri, { idempotent: true });
              await loadDirectory();
              await loadDiskStats();
            } catch {
              Alert.alert('Помилка', 'Не вдалося видалити об’єкт.');
            }
          },
        },
      ]
    );
  };

  const goUp = () => {
    if (currentDir === ROOT_DIR) return;
    const withoutSlash = currentDir.replace(/\/$/, '');
    const parent = withoutSlash.substring(0, withoutSlash.lastIndexOf('/') + 1);
    if (parent.startsWith(ROOT_DIR)) {
      setCurrentDir(parent);
    } else {
      setCurrentDir(ROOT_DIR);
    }
  };

  const renderItem = ({ item }: { item: FileItem }) => (
    <View style={styles.itemCard}>
      <Pressable style={styles.itemMain} onPress={() => openItem(item)}>
        <View style={[styles.iconCircle, item.isDirectory ? styles.folderIcon : styles.fileIcon]}>
          <Ionicons name={item.isDirectory ? 'folder' : 'document-text'} size={24} color="#fff" />
        </View>
        <View style={styles.itemTextBlock}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemMeta}>
            {item.isDirectory ? 'Папка' : `Файл .${getExtension(item.name)} · ${formatBytes(item.size)}`}
          </Text>
        </View>
        {item.isDirectory && <Ionicons name="chevron-forward" size={22} color="#61708a" />}
      </Pressable>

      <View style={styles.actionsRow}>
        <Pressable style={styles.actionButton} onPress={() => openInfo(item)}>
          <Ionicons name="information-circle-outline" size={18} color="#1f6feb" />
          <Text style={styles.actionText}>Інфо</Text>
        </Pressable>
        {!item.isDirectory && getExtension(item.name) === 'txt' && (
          <Pressable style={styles.actionButton} onPress={() => openEdit(item)}>
            <Ionicons name="create-outline" size={18} color="#1f6feb" />
            <Text style={styles.actionText}>Редагувати</Text>
          </Pressable>
        )}
        <Pressable style={[styles.actionButton, styles.deleteButton]} onPress={() => deleteItem(item)}>
          <Ionicons name="trash-outline" size={18} color="#d1242f" />
          <Text style={[styles.actionText, styles.deleteText]}>Видалити</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Файловий менеджер</Text>
        <Text style={styles.headerSubtitle}>Лабораторна робота №4</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.pathCard}>
          <Text style={styles.sectionLabel}>Поточний шлях</Text>
          <Text style={styles.pathText}>{relativePath}</Text>
        </View>

        <View style={styles.memoryCard}>
          <Text style={styles.sectionLabel}>Статистика памʼяті пристрою</Text>
          {diskStats ? (
            <View style={styles.memoryGrid}>
              <View style={styles.memoryItem}>
                <Text style={styles.memoryValue}>{formatBytes(diskStats.total)}</Text>
                <Text style={styles.memoryLabel}>Загалом</Text>
              </View>
              <View style={styles.memoryItem}>
                <Text style={styles.memoryValue}>{formatBytes(diskStats.free)}</Text>
                <Text style={styles.memoryLabel}>Вільно</Text>
              </View>
              <View style={styles.memoryItem}>
                <Text style={styles.memoryValue}>{formatBytes(diskStats.used)}</Text>
                <Text style={styles.memoryLabel}>Зайнято</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.mutedText}>Не вдалося отримати статистику памʼяті.</Text>
          )}
        </View>

        <View style={styles.toolbar}>
          <Pressable style={[styles.toolbarButton, currentDir === ROOT_DIR && styles.disabledButton]} onPress={goUp} disabled={currentDir === ROOT_DIR}>
            <Ionicons name="arrow-up" size={18} color={currentDir === ROOT_DIR ? '#9ca3af' : '#fff'} />
            <Text style={[styles.toolbarButtonText, currentDir === ROOT_DIR && styles.disabledButtonText]}>Вгору</Text>
          </Pressable>
          <Pressable style={styles.toolbarButton} onPress={openCreateFolder}>
            <Ionicons name="folder-open" size={18} color="#fff" />
            <Text style={styles.toolbarButtonText}>Папка</Text>
          </Pressable>
          <Pressable style={styles.toolbarButton} onPress={openCreateFile}>
            <Ionicons name="document-text" size={18} color="#fff" />
            <Text style={styles.toolbarButtonText}>TXT файл</Text>
          </Pressable>
        </View>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
            <Text style={styles.mutedText}>Завантаження...</Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.uri}
            renderItem={renderItem}
            contentContainerStyle={items.length === 0 ? styles.emptyList : styles.list}
            ListEmptyComponent={
              <View style={styles.emptyBlock}>
                <Ionicons name="file-tray-outline" size={50} color="#94a3b8" />
                <Text style={styles.emptyTitle}>Папка порожня</Text>
                <Text style={styles.emptyText}>Створіть папку або текстовий файл.</Text>
              </View>
            }
          />
        )}
      </View>

      <Modal visible={modalMode !== null} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <ScrollView keyboardShouldPersistTaps="handled">
              {modalMode === 'folder' && (
                <>
                  <Text style={styles.modalTitle}>Створення папки</Text>
                  <TextInput style={styles.input} placeholder="Назва папки" value={nameInput} onChangeText={setNameInput} />
                  <View style={styles.modalActions}>
                    <Pressable style={styles.secondaryBtn} onPress={() => setModalMode(null)}><Text style={styles.secondaryBtnText}>Скасувати</Text></Pressable>
                    <Pressable style={styles.primaryBtn} onPress={createFolder}><Text style={styles.primaryBtnText}>Створити</Text></Pressable>
                  </View>
                </>
              )}

              {modalMode === 'file' && (
                <>
                  <Text style={styles.modalTitle}>Створення .txt файлу</Text>
                  <TextInput style={styles.input} placeholder="Назва файлу" value={nameInput} onChangeText={setNameInput} />
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Початковий вміст файлу"
                    value={contentInput}
                    onChangeText={setContentInput}
                    multiline
                    textAlignVertical="top"
                  />
                  <View style={styles.modalActions}>
                    <Pressable style={styles.secondaryBtn} onPress={() => setModalMode(null)}><Text style={styles.secondaryBtnText}>Скасувати</Text></Pressable>
                    <Pressable style={styles.primaryBtn} onPress={createFile}><Text style={styles.primaryBtnText}>Створити</Text></Pressable>
                  </View>
                </>
              )}

              {modalMode === 'view' && selectedItem && (
                <>
                  <Text style={styles.modalTitle}>Перегляд файлу</Text>
                  <Text style={styles.modalFileName}>{selectedItem.name}</Text>
                  <Text style={styles.readOnlyBox}>{contentInput || 'Файл порожній.'}</Text>
                  <View style={styles.modalActions}>
                    <Pressable style={styles.secondaryBtn} onPress={() => setModalMode(null)}><Text style={styles.secondaryBtnText}>Закрити</Text></Pressable>
                    <Pressable style={styles.primaryBtn} onPress={() => setModalMode('edit')}><Text style={styles.primaryBtnText}>Редагувати</Text></Pressable>
                  </View>
                </>
              )}

              {modalMode === 'edit' && selectedItem && (
                <>
                  <Text style={styles.modalTitle}>Редагування файлу</Text>
                  <Text style={styles.modalFileName}>{selectedItem.name}</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={contentInput}
                    onChangeText={setContentInput}
                    multiline
                    textAlignVertical="top"
                  />
                  <View style={styles.modalActions}>
                    <Pressable style={styles.secondaryBtn} onPress={() => setModalMode(null)}><Text style={styles.secondaryBtnText}>Скасувати</Text></Pressable>
                    <Pressable style={styles.primaryBtn} onPress={saveEditedFile}><Text style={styles.primaryBtnText}>Зберегти</Text></Pressable>
                  </View>
                </>
              )}

              {modalMode === 'info' && selectedItem && (
                <>
                  <Text style={styles.modalTitle}>Детальна інформація</Text>
                  <InfoRow label="Назва" value={selectedItem.name} />
                  <InfoRow label="Тип" value={selectedItem.isDirectory ? 'Папка' : `Файл .${getExtension(selectedItem.name)}`} />
                  <InfoRow label="Розмір" value={selectedItem.isDirectory ? 'не застосовується' : formatBytes(selectedItem.size)} />
                  <InfoRow label="Дата модифікації" value={formatDate(selectedItem.modificationTime)} />
                  <InfoRow label="URI" value={selectedItem.uri} />
                  <View style={styles.modalActions}>
                    <Pressable style={styles.primaryBtn} onPress={() => setModalMode(null)}><Text style={styles.primaryBtnText}>Закрити</Text></Pressable>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
    backgroundColor: '#0f172a',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 27,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: '#cbd5e1',
    marginTop: 4,
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 16,
  },
  pathCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  memoryCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  sectionLabel: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 7,
  },
  pathText: {
    color: '#0f172a',
    fontSize: 17,
    fontWeight: '700',
  },
  memoryGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  memoryItem: {
    flex: 1,
    backgroundColor: '#eff6ff',
    borderRadius: 13,
    padding: 10,
  },
  memoryValue: {
    fontWeight: '800',
    color: '#1e40af',
    fontSize: 13,
  },
  memoryLabel: {
    color: '#475569',
    fontSize: 12,
    marginTop: 4,
  },
  toolbar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  toolbarButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#2563eb',
    paddingVertical: 11,
    borderRadius: 14,
  },
  disabledButton: {
    backgroundColor: '#e5e7eb',
  },
  toolbarButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },
  disabledButtonText: {
    color: '#9ca3af',
  },
  list: {
    paddingBottom: 30,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  mutedText: {
    color: '#64748b',
  },
  emptyBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 12,
  },
  emptyText: {
    color: '#64748b',
    marginTop: 6,
    textAlign: 'center',
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 12,
    padding: 12,
    elevation: 2,
  },
  itemMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  folderIcon: {
    backgroundColor: '#f59e0b',
  },
  fileIcon: {
    backgroundColor: '#0ea5e9',
  },
  itemTextBlock: {
    flex: 1,
  },
  itemName: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
  },
  itemMeta: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 11,
    backgroundColor: '#eff6ff',
  },
  deleteButton: {
    backgroundColor: '#fff1f2',
  },
  actionText: {
    color: '#1f6feb',
    fontWeight: '700',
    fontSize: 12,
  },
  deleteText: {
    color: '#d1242f',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    maxHeight: '82%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
  },
  modalTitle: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
  },
  modalFileName: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 12,
    fontSize: 16,
    color: '#0f172a',
  },
  textArea: {
    minHeight: 150,
  },
  readOnlyBox: {
    minHeight: 130,
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    borderRadius: 14,
    padding: 14,
    lineHeight: 22,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  primaryBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 13,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '800',
  },
  secondaryBtn: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 13,
  },
  secondaryBtnText: {
    color: '#334155',
    fontWeight: '800',
  },
  infoRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingVertical: 12,
  },
  infoLabel: {
    color: '#64748b',
    fontWeight: '700',
    marginBottom: 4,
  },
  infoValue: {
    color: '#0f172a',
    fontSize: 15,
  },
});
