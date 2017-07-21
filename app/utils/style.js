export const parseRule = (key, value) => {

    const map = {
        fontSize: 'font-size',
        color:'color',
        backgroundColor: 'background-color',
        backgroundSize: 'background-size',
        fontWeight: 'font-weight',
        textAlign: 'text-align',
        backgroundImage: 'background-image',
        backgroundPosition: 'background-position',
        backgroundRepeat: 'background-repeat',
        fontFamily: 'font-family',
        fontStyle: 'font-style',
        lineHeight: 'line-height',
        width: 'width',
        height: 'height',
        flex: 'flex',
        order: 'order',
        border: 'border',
        padding: 'padding',
        margin: 'margin',
        paddingTop: 'padding-top',
        paddingLeft: 'padding-left',
        paddingBottom: 'padding-bottom',
        paddingRight: 'padding-right',
        marginTop: 'margin-top',
        marginLeft: 'margin-left',
        marginBottom: 'margin-bottom',
        marginRight: 'margin-right',
        borderRadius: 'border-radius',
        borderShadow: 'border-shadow',
        boxShadow: 'box-shadow',
        textShadow: 'text-shadow',
        flexDirection: 'flex-direction',
        flexWrap: 'flex-wrap',
        justifyContent: 'justify-content',
        alignItems: 'align-items',
        alignContent: 'align-content',
        alignSelf: 'align-self',
        letterSpacing: 'letter-spacing',
        display: 'display',
        position: 'position',
        top: 'top',
        right: 'right',
        bottom: 'bottom',
        left: 'left',
        overflow: 'overflow'
    }

    if (!map[key]) {
        return '';
    }

    return `${map[key]}: ${value}`;

}

export const parseRules = (style) => {
    return Object.keys(style).reduce((output, key) => {
        const value = style[key];

        return output + parseRule(key, value) + ';';

    }, '');
}

export const parseStyle = (id, style, byTag) => {
    if (!style) {
        return '';
    }

    const rules = parseRules(style);

    if (!rules) {
        return '';
    }

    return `{ ${rules} }`;
}

export const parseSelector = (id, tag, byTag) => {
    if (byTag) {
        return `.tag-${tag}`;
    } else {
        return `#element-${id}`;
    }
}

export const parseStyles = (state, resolution, byTag) => {
    return Object.keys(state).reduce((output, id) => {
        const element = state[id],
            data = element.data || {},
            tag = data.tag || '',
            vars = data.vars || {},
            style = vars[`r${resolution}`];

        return output + parseSelector(id, tag, byTag) + ' ' +  parseStyle(id, style) + ' ';
    }, '')
}
