/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  white: '#fff',
  blue: '#0b5be6',
  dark5: '#C2C4CD',
  gray1: '#555865',
  gray2: '#F1F1F3',
  gray3: '#909090',
  gray4: '#F3F3F5',
  gray5: '#3F4253',
  gray6: '#E3E3E3',
  gray7: '#BDBDBD',
  gray8: '#9F9F9F',
  gray9: '#C8C8C8',
  gray10: '#F5F5F5',
  black1: '#151933',
  orange: '#e6710b',
  green: '#6AA84F',
  mineShaft: '#2B2B2B',
};
