const Button = {
  // 1. We can update the base styles
  baseStyle: {
    // fontWeight: 'normal' // Normally, it is "semibold"
    borderRadius: 20,
  },
  // 2. We can add a new button size or extend existing
  sizes: {
    xl: {
      h: "56px",
      fontSize: "lg",
      px: "32px",
    },
  },
  // 3. We can add a new visual variant
  variants: {
    "with-shadow": {
      boxShadow: "0 0 2px 2px #efdfde",
    },
    // 4. We can override existing variants
    solid: (props: any) => ({
      // bg: props.colorMode === 'dark' ? 'primary.300' : 'primary.300',
      // color: "grey.100",
    }),
  },
};

export default Button;
