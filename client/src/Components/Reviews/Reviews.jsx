import React from 'react'
import "./Reviews.css"

export const Reviews = () => {
  return (
    <div className="reviews">
      <div className="reviews-customerReviews">
        <div className="reviews-customerReviews-head">
          <h2>Customer Reviews</h2>
        </div>
        <div className="reviews-customerReviews-ratings"></div>
        <div className="reviews-customerReviews-writeReview-button">
          <button>Write a Review</button>
        </div>
      </div>
      <hr />
      <div className="reviews-writeReview">
        <form>
          <div className="reviews-writeReview-fieldset">
            <h4>Write a Review</h4>
          </div>
          <div className="reviews-writeReview-fieldset">
            <label>Rating</label>
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
            <p>How we use your data: We’ll only contact you about the review you left, and only if necessary. By submitting your review, you agree to Judge.me’s terms, privacy and content policies.</p>
          </div>
          <div className="reviews-writeReview-fieldset">
            <a href="" role="button">Cancel Reivew</a>
            <input type="submit" value="Submit Review" />
          </div>
          <hr />
        </form>
      </div>
    </div>
  )
}
