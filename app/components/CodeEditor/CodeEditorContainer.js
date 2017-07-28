import {connect} from 'react-redux'
import CodeEditor from './CodeEditor'

import {format as formatRN} from 'lpm-transpilers/transpilers/reactNative/parse';
// import parseWeb from 'lpm-transpilers/transpilers/web/parse';

import clone from 'clone';

const mapStateToProps = (state, ownProps) => {
    const {flexState} = state,
        {elements} = flexState,
        {present} = elements;

    const code = formatRN(clone(present), 1, 'Layout');

    return {
        code,
        json: present
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        method: () => {
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CodeEditor)
