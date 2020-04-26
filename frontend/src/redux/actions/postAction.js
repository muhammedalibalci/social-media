import * as apiCalls from '../../api/postCalls';

export const loadPosts = (posts, length) => {
    return {
        type: 'LOAD_POSTS',
        posts,
        length
    }
}

export const loadPostsHandler = (userId) => {
    return function (dispatch) {
        return apiCalls.getposts().then((res) => {
            res.data.content.forEach(post => {
                post.likeUsers.forEach(postUserLike => {
                    console.log(userId);
                    
                    if (postUserLike.id === userId) {

                        Object.assign(post, { liked: true })
                    }
                });
            });

            dispatch(loadPosts(
                res.data.content,
                res.data.numberOfElements
            ))
            return dispatch
        })
    }
}
export const loadOldPosts = (posts, length) => {
    return {
        type: 'LOAD_OLD_POSTS',
        posts,
        length
    }
}

export const loadOldPostsHandler = (id) => {
    return function (dispatch) {
        return apiCalls.getoldposts(id).then((res) => {
            dispatch(loadOldPosts(
                { ...res.data },
                res.data.numberOfElements
            ))
            return dispatch
        })
    }
}

export const loadPost = (post) => {
    return {
        type: 'LOAD_POST',
        post
    }
}
export const loadPostHandler = (id) => {
    return dispatch => {
        return apiCalls.getpost(id).then(res => {
            console.log(res.data);
            dispatch(loadPost(
                { ...res.data }
            ))
        })
    }
}