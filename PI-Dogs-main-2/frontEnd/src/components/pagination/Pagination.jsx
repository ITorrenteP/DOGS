import React from 'react';
import styles from './PaginationComp.module.css'
import { setCurrentPage } from '../../redux/actions';
import { useDispatch } from 'react-redux';


const Pagination = ({ totalDogs, postsPerPage, currentPage }) => {
  const dispatch = useDispatch();  
  let pages = []
  
    for (let i = 1; i <= Math.ceil(totalDogs / postsPerPage); i++) {
      pages.push(i);
    }

    const handlePageChange = (page) => {
      dispatch(setCurrentPage(page));
  }
  
    return (
      
        <div className={styles.pagination}>
          {pages.map((page, index) => {
            return (
              <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? styles.active : ""}
          >
              {page}    
          </button>
            )
          })}
        </div>
    );
  };
  

export default Pagination

