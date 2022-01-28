import React, {Fragment} from 'react';

const ListReviews = ({reviews}) => {
  return (<Fragment>
      <div class="reviews w-75">
          <h3>Other's Reviews:</h3>
      {reviews.map(review =>(
                           <Fragment key={review.id}>
                           <hr />
                               <div class="review-card my-3">
                                   <div class="rating-outer">
                                       <div class="rating-inner" style={{width: `${(review.rating / 5) * 100}%s`}}></div>
                                   </div>
                                   <p class="review_user">by {review.name}</p>
                                   <p class="review_comment">{review.comment}</p>
               
                                   <hr />
                               </div>
                               </Fragment>
                        ))
                        }
                        </div>
  </Fragment>);
};

export default ListReviews;
