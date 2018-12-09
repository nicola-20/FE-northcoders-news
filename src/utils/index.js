export const sortByVotes = (array, direction) => {
  if (direction === "asc") {
    array.sort((a, b) => {
      if (a.votes < b.votes) {
        return -1;
      } else if (a.votes > b.votes) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (direction === "desc") {
    array.sort((a, b) => {
      if (a.votes < b.votes) {
        return 1;
      } else if (a.votes > b.votes) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}