// Increment the News Like
function Like(userId, newsId) {
  const newsButton = document.getElementById(`news${newsId}`);
  console.log(newsButton.innerHTML);
  if (newsButton.innerHTML === 'Like') {
  console.log(newsButton.innerHTML);

    // Setting the button
    newsButton.style.backgroundColor = 'red';
    newsButton.innerHTML = 'Unlike';
    // Setting the like Count
    const incrementcount = document.getElementById(`likeCount${newsId}`);
    incrementcount.style.visibility = 'visible';
    const value = incrementcount.innerHTML * 1;
    incrementcount.innerHTML = value + 1;

    $.ajax({
      url: ` /news/increment/${userId}/${newsId}`,
      type: 'post',
      cache: false,
    });
  } else if (newsButton.innerHTML === 'Unlike') {
    // Decrese the News Like

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

    $.ajax({
      url: `/news/decrement/${userId}/${newsId}`,
      type: 'post',
      cache: false,
    });
  }
}
