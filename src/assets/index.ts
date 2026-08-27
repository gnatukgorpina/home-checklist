/**
 * Asset registry.
 *
 * This build renders entirely with vectors — lucide-react-native icons,
 * react-native-svg (rings, bar chart) and LinearGradient backgrounds — so there
 * are NO bitmap `require()`s here. Nothing to bundle, nothing to fail at runtime.
 *
 * The launcher icon is produced from assets.json (icon_1024) by the pipeline and
 * copied into android/app/src/main/res/mipmap-*; it is not imported by JS.
 */
export const APP_BRAND = 'HomeChecklist';
