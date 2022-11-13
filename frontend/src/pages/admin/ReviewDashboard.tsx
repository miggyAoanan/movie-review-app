import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getReviews, reviewDetails, updateReview, deleteReview } from "../../redux/reviewSlice"
import { getMovies, movieDetails} from "../../redux/movieSlice";
import './Dash.scss'
import DeleteReviewModal, { DeleteReviewFunction } from "./modal/DeleteReviewModal";
import  { UpdateFunction } from "./modal/UpdateReviewModal";
import { Rating } from 'react-simple-star-rating'
import { Review } from "../../interfaces";

const ReviewDashboard = () => {
  const reviews :Review[] = useAppSelector(reviewDetails)
  const dispatch = useAppDispatch();
  const movies = useAppSelector(movieDetails)
  

  useEffect(() => {
    if (reviews) {
      dispatch(getReviews())
    }

  }, [dispatch])

  useEffect(() => {
    if (movies) {
      dispatch(getMovies())
    }
  }, [dispatch])


  //delete modal
  const [deleteId, setDeleteId] = useState<string>("")
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
  const toggleDeleteModal = () => {
    setDeleteModalVisible(wasDeleteModalVisible => !wasDeleteModalVisible)
  }

  const onBackdropClick = () => {

    setDeleteModalVisible(false)
  }


  const onDeleteReview: DeleteReviewFunction = async (id: string) => {
    dispatch(deleteReview(id)).then((res:any) => {
      onBackdropClick()
      dispatch(getReviews())
    })
  }


  const onUpdateReview: UpdateFunction = async (args: { id: string | undefined, isActive: boolean | undefined }) => {

    let isActiveValue = !args.isActive
    let newArgs = { id: args.id, isActive: isActiveValue }
    dispatch(updateReview(newArgs)).then((res:any) => {
      dispatch(getReviews())
    })

  }

  return (
    <div className="wrapper">
      <h2 className="h2 text-center text-white mb-5">Review List </h2>
      <table className='table table-dark '>
        <thead >
          <tr className='bg-dark'>
            <th scope="col">#</th>
            <th scope="col">User</th>
            <th scope="col">Movie</th>
            <th scope="col">Review Content</th>
            <th scope="col">Rating</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {reviews ? (
            reviews.map((review: Review, index:number) => {
              return (
                <tr key={review.id}>
                  <td>{index + 1}</td>
                  <td>{review.userName}</td>
                  <td>{review.movieName}</td>
                  <td>{review.description}</td>
                  <td>
                  <Rating
                    disableFillHover={true}
                   size={25}
                   initialValue={review.rating}
                  />
                  </td>
                  <td>{review.isActive === true ? "Active" : "Inactive"}</td>
                 
                  <td>

                    <div className='form-outline form-white mb-4'>
                      <label className="switch"

                      >
                        {review.isActive === true ?

                          <input type="checkbox" defaultChecked
                            value={String(review.isActive)}
                            onClick={() => onUpdateReview({ id: review.id, isActive: review.isActive })}
                            className="btn btn-secondary btn-sm "
                          />
                          :

                          <input type="checkbox"
                            value={String(review.isActive)}

                            onClick={() => onUpdateReview({ id: review.id, isActive: review.isActive })}
                            className="btn btn-secondary btn-sm "
                          />
                        }


                        <div className="slider"></div>
                      </label>
                    </div>


                  </td>
                  <td>


                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => { toggleDeleteModal(); setDeleteId(review.id!) }}
                    >Delete</button>

                  </td>
                </tr>
              )
            })
          ) : ""}
        </tbody>
      </table>

      <DeleteReviewModal
        onClose={onBackdropClick}
        isDeleteModalVisible={isDeleteModalVisible}
        onDeleteReview={onDeleteReview}
        deleteId={deleteId}
      />


    </div>
  )
}

export default ReviewDashboard