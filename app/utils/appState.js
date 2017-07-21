export const getCurrentOverlay = (appState) => {
    const {resolution, overlay} = appState;
    return overlay[`r${resolution}`] || {};
}

export const getCurrentOverlayUrl = (appState) => {
    return getCurrentOverlay(appState).url;
}

export const getCanvasOverlay = (flexState) => {
    const {appState} = flexState,
        {overlay} = appState;

    return overlay || {};
}


export const getCanvasOverlayTop = (flexState) => {
    return getCanvasOverlay(flexState).top;
}

