import 'styled-components/native';
import { lightTheme } from './theme/theme';

type AppTheme = typeof lightTheme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {}
}
