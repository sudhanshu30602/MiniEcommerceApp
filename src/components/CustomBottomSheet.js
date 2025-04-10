// CustomBottomSheet.js
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

const CustomBottomSheet = React.forwardRef(({ children, height = 600 }, ref) => {
  return (
    <RBSheet
      ref={ref}
      height={height}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 16,
        },
      }}
    >
      {children}
    </RBSheet>
  );
});

export default CustomBottomSheet;
