import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { ReviewService } from './../../services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  userRating: number = 0;
  userReview: string = '';
  UserId: any = '6584b17c79bb6bbe7ce56238';
  RestoId: any = null;
  reviews: any[] = [];
  averageRating: number = 0;
  ratingsCount: any = {};
  starsToDisplay: number[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private ReviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      this.RestoId = params.get('id');

      if (this.RestoId) {
        this.loadReviews();
      }
    });
    // Load reviews on component initialization
  }

  loadReviews() {
    this.ReviewService.getRestaurantRating(this.RestoId).subscribe(
      (data) => {
        this.reviews = data.reviews;
        const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
        this.averageRating = this.reviews.length > 0 ? totalRating / this.reviews.length : 0;

        // Extract ratings count from the response
        this.ratingsCount = data.ratingsCount;

        // Update starsToDisplay array based on the averageRating
        this.starsToDisplay = this.ReviewService.generateStarsArray(this.averageRating);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  submitReview() {

    if (this.RestoId) {
      this.UserId=this.userService.getUserId()
      // Call the UserService to submit the review
      this.ReviewService.submitRating(
        this.UserId,
        this.RestoId,
        this.userRating,
        this.userReview
      ).subscribe(
        (response) => {
          console.log('Review submitted successfully:', response);

          // After submitting, reload reviews to reflect the new one
          this.loadReviews();
          // Clear input fields after submitting
          this.userRating = 0;
          this.userReview = '';
        },
        (error) => {
          console.error('Error submitting review:', error);
          // Handle error, e.g., show error message to the user
        }
      );
    }
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }


}
