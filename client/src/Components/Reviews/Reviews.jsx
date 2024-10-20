import React, { useState } from 'react'
import "./Reviews.css"

export const Reviews = () => {
  const [ rating, setRating ] = useState(0);

  const handleStarRating =(index) => {
    setRating(index);
  }
  return (
    <div className="reviews">
      <div className="reviews-customerReviews">
        <div className="reviews-customerReviews-head">
          <h2>Customer Reviews</h2>
        </div>
        <div className="reviews-customerReviews-content">
          <div className="reviews-customerReviews-ratings"></div>
          <div className="reviews-customerReviews-writeReview-button">
            <button>Write a Review</button>
          </div>
        </div>
        
      </div>
      <hr />
      <div className="reviews-writeReview">
        <form>
          <div className="reviews-writeReview-fieldset">
            <p className="write-review">Write a Review</p>
          </div>
          <div className="reviews-writeReview-fieldset">
            <label>Rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star,index) => (
                <i key={index} className={`bi ${rating >= star ? 'bi-star-fill text-warning' : 'bi-star text-black'}`} onClick={()=> handleStarRating(star)}></i>
              ))}
            </div>
            {/* add span tag for star */}
          </div>
          <div className="reviews-writeReview-fieldset">
            <label>Review Title</label> {/* add span tag for letters you can enter for revivew title */}
            <input type="text" name="review-title" placeholder="Give your review a title" />
          </div>
          <div className="reviews-writeReview-fieldset">
            <label>Review</label> {/* add span tag for letters you can enter for revivew comment */}
            <textarea name="review_body" id="" placeholder="Write your comments here" ></textarea>
          </div>
          <div className="reviews-writeReview-fieldset">
            <label>Name</label>
            <input type="text" name="reviewer_name" placeholder="Enter your name" />
          </div>
          <div className="reviews-writeReview-fieldset">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="reviews-writeReview-fieldset">
            <p className="random-data">How we use your data: We’ll only contact you about the review you left, and only if necessary. By submitting your review, you agree to Judge.me’s terms, privacy and content policies.</p>
          </div>
          <div className="reviews-writeReview-fieldset-submit">
            <a href="" role="button">Cancel Review</a>
            <input type="submit" value="Submit Review" />
          </div>
          <hr />
        </form>
      </div>
    </div>
  )
}
