import styles from './CSS/PaginationComp.module.css'

const Pagination = ({ dogsPerPage, totalDogs, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className={styles.pagination}>
          {pageNumbers.map((number) => (
            <li key={number} className={styles.pageItem}>
              <a onClick={() => paginate(number)} href="#" className={styles.pageLink}>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  

export default Pagination

