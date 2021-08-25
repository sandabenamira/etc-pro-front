import React from "react";
import { Comment } from "semantic-ui-react";

import Avatar from '../../../../../assets/images/avatar.png';
const CommentExample = () => (
    <Comment.Group>
        <Comment style={{ display: 'flex', marginBottom: '2%' }}>
            <Comment.Avatar
                as="a"
                src={Avatar}
                style={{ paddingRight: '2%'}}
            />
            <Comment.Content >
                <Comment.Author style={{ fontSize: '16px'}}>Nom Prénom</Comment.Author>
                <Comment.Text style={{ fontSize: '13px'}}>Lorem ipsum dolor sit amet</Comment.Text>
            </Comment.Content>
        </Comment>
    </Comment.Group>
);

export default CommentExample;
