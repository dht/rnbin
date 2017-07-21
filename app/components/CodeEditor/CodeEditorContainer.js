import {connect} from 'react-redux'
import CodeEditor from './CodeEditor'

import {format} from 'lpm-transpilers/transpilers/reactNative/parse';
import clone from 'clone';

const mapStateToProps = (state, ownProps) => {
    const {flexState} = state,
        {elements} = flexState,
        {present} = elements;

    const code = format(clone(present), 1, 'Layout');

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
