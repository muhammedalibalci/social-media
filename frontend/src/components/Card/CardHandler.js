import React from 'react'

export default function CardHandler(props) {
    return (
        <div className="row ml-5 mt-1">
            <div className="col-md-8" onClick={props.onClickLikeOrDislike}>
                {props.likeSection}
                {props.postLike} Likes
                    </div>
            <div
                className="mx-auto"
                onClick={props.onClickComment}
            >
                <i className="far fa-comment mr-2" ></i>
                {props.comments.length} Comments

                    </div>
        </div>
    )
}
