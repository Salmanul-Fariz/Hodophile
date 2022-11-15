// Increment the News Like
function Like(userId, newsId) {
  const newsButton = document.getElementById(`news${newsId}`);
  console.log(newsButton.innerHTML);
  if (newsButton.innerHTML === 'Like') {
    $.ajax({
      url: ` /blogs/increment/${userId}/${newsId}`,
      type: 'get',

      success: (res) => {
        if (res.status) {
          // Setting the button
          newsButton.style.backgroundColor = 'red';
          newsButton.innerHTML = 'Unlike';
          // Setting the like Count
          const incrementcount = document.getElementById(`likeCount${newsId}`);
          incrementcount.style.visibility = 'visible';
          const value = incrementcount.innerHTML * 1;
          incrementcount.innerHTML = value + 1;
        }
      },
    });
  } else if (newsButton.innerHTML === 'Unlike') {
    // Decrese the News Like

    $.ajax({
      url: `/blogs/decrement/${userId}/${newsId}`,
      type: 'get',

      success: (res) => {
        if (res.status) {
          // Setting the button
          newsButton.style.backgroundColor = '#41c356';
          newsButton.innerHTML = 'Like';

          // Setting the like Count
          const incrementcount = document.getElementById(`likeCount${newsId}`);
          incrementcount.style.visibility = 'visible';
          const value = incrementcount.innerHTML * 1;
          if (value - 1 <= 0) {
            incrementcount.innerText = '';
          } else {
            incrementcount.innerText = value - 1;
          }
        }
      },
    });
  }
}
