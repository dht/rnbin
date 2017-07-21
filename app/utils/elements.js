export const getRoot = (flexState) => {
    const {elements} = flexState,
        {present} = elements;

    return present[1];
}

export const getRootStyle = (flexState) => {
   return getRoot(flexState).style || {};
}

export const getRootWidth = (flexState) => {
    return getRootStyle(flexState).width;
}

export const getRootHeight = (flexState) => {
    return getRootStyle(flexState).height;
}