import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import CommentExample from './CommentExample';
//import ProgressBar from './Progress-bar'; 

const styles = {
    slideContainer: {
        height: 150,
        WebkitOverflowScrolling: 'touch',
        marginTop: '2%'
    },
    slide: {
        padding: 15,
        minHeight: 100,
        color: 'black',
        fontSize: '20px,'
    },
    slide1: {

    }
};

const list = [];

for (let i = 0; i < 30; i += 1) {
    list.push(<CommentExample></CommentExample>);
}

function CommentSection() {
    return (
        <SwipeableViews containerStyle={styles.slideContainer}>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>{list}</div>
        </SwipeableViews>
    );
}

export default CommentSection;
