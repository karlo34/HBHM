class Recipe {
  constructor(name, difficulty, rating, moreInfo) {
    this.name = name;
    this.difficulty = difficulty;
    this.rating = rating;
    this.moreInfo = moreInfo;
    this.comments = [];
  }

  render() {
    const recipeGrid = document.getElementById('recipe-grid');
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.dataset.difficulty = this.difficulty;
    recipeCard.dataset.rating = this.rating;
    recipeCard.innerHTML = `
        <h3>${this.name}</h3>
        <p>Difficulty: ${this.difficulty}</p>
        <p>Rating: <span class="rating">${Math.round(this.rating * 10) / 10}</span>/5</p>
        <div class="more-info" style="display:none">${this.moreInfo}</div>
        <button class="read-more-button">Read more</button>
        <div class="comment-section">
          <h4>Comments</h4>
          <ul class="comment-list"></ul>
          <form class="comment-form">


            <input type="text" id="comment-input" required placeholder='Add a Comment'> </br> </br> 
            <input type="number" id="rating-input" min="1" max="5" required placeholder=' Rate'>
            <button type="submit" class='submit-recipe'>Submit</button>
          </form>
        </div>
      `;
    recipeGrid.appendChild(recipeCard);

    const readMoreButton = recipeCard.querySelector('.read-more-button');
    const moreInfoDiv = recipeCard.querySelector('.more-info');
    const commentForm = recipeCard.querySelector('.comment-form');
    const commentList = recipeCard.querySelector('.comment-list');
    const ratingSpan = recipeCard.querySelector('.rating');

    readMoreButton.addEventListener('click', function () {
      if (moreInfoDiv.style.display === 'none') {
        moreInfoDiv.style.display = 'block';
        readMoreButton.textContent = 'Read less';
      } else {
        moreInfoDiv.style.display = 'none';
        readMoreButton.textContent = 'Read more';
      }
    });
    
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const commentInput = commentForm.querySelector('#comment-input');
      const ratingInput = commentForm.querySelector('#rating-input');
      const comment = commentInput.value.trim();
      const rating = parseInt(ratingInput.value);
      if (!comment || !rating) {
        return;
      }
      this.comments.push({ comment, rating });
      this.updateRating(ratingSpan);
      this.renderComments(commentList);
      commentInput.value = '';
      ratingInput.value = '';
    });

    this.renderComments(commentList);
  }

  renderComments(commentList) {
    commentList.innerHTML = '';
    for (let i = 0; i < this.comments.length; i++) {
      const comment = this.comments[i];
      const li = document.createElement('li');
      li.innerHTML = `${comment.comment} (Rating: ${comment.rating})`;
      commentList.appendChild(li);
    }
  }

  updateRating(ratingSpan) {
    let totalRating = 0;
    for (let i = 0; i < this.comments.length; i++) {
      const comment = this.comments[i];
      totalRating += comment.rating;
    }
    this.rating = totalRating / this.comments.length;
    ratingSpan.textContent = Math.round(this.rating * 10) / 10;
  }
}

const recipes = [
  new Recipe('Sesame-crusted tuna with green tea noodle salad', 'easy', 4, 'Level up your tuna lunch with this fancy Asian-inspired salad!'),
  new Recipe('Healthy turmeric and coconut fish curry', 'hard', 3, 'Whiting is a delicate fish that requires minimal cooking and suits the gently spiced flavours of this easy dish. Recipe by Christine Manfield.'),
  new Recipe('Green tea noodles with sticky sweet chilli salmon', 'easy', 5, 'Green tea noodles bring a pop of colour to this easy midweek dinner.'),
  new Recipe('Silverbeet fatteh with sumac yoghurt and chickpeas', 'hard', 2, '"Try this dish with roast cauliflower, eggplant or roast pumpkin instead of silverbeet for a variation," says Tom Walton. Begin this recipe 1 day ahead.'),
  new Recipe('Tuna tostadas with jalapeno guacamole', 'easy', 3, 'This seafood starter is the perfect way to kick off a summer soirée.'),
  new Recipe('The Wood familys puttanesca', 'hard', 4, '“This dish has become my pasta-loving family’s go-to for a fast weeknight meal. We make it so much it’s become a staple!” - Phoebe Wood.')
];

for (let i = 0; i < recipes.length; i++) {
  recipes[i].render();
}

document.getElementById('filter-button').addEventListener('click', function () {
  const difficulty = document.getElementById('difficulty-filter').value;
  const rating = document.getElementById('rating-filter').value;
  const recipeCards = Array.from(document.querySelectorAll('.recipe-card'));

  recipeCards.forEach(function (card) {
    const cardDifficulty = card.dataset.difficulty;
    const cardRating = card.dataset.rating;

    if (
      (difficulty === '' || cardDifficulty === difficulty) &&
      (rating === '' || (rating === 'best' && cardRating >= 4) || (rating === 'worst' && cardRating < 4))
    ) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

document.getElementById('add-recipe-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('recipe-name').value;
  const difficulty = document.getElementById('recipe-difficulty').value;
  const rating = document.getElementById('recipe-rating').value;
  const ingredients = document.getElementById('recipe-ingredients').value;
  const newRecipe = new Recipe(name, difficulty, rating, `${ingredients}\n`);
  newRecipe.render();

  setTimeout(function () {
    var recipeCards = Array.from(document.querySelectorAll('.recipe-card'));
    var newRecipeCard = recipeCards.find(function (card) {
      return card.querySelector('h3').textContent === name;
    });

    var ratingElement = document.createElement('p');
    var nasumicniBr = Math.floor(Math.random() * 5) + 1;

    if (nasumicniBr < 3) {
      ratingElement.textContent = 'Random rating: ' + nasumicniBr + '/5 (negative)';
    } else if (nasumicniBr > 3) {
      ratingElement.textContent = 'Random rating: ' + nasumicniBr + '/5 (positive)';
    } else {
      ratingElement.textContent = 'Random rating: ' + nasumicniBr + '/5 (neutral)';
    }
    newRecipeCard.appendChild(ratingElement);
    var comments = [];
    if (nasumicniBr < 3) {
      comments.push(
        'I did not enjoy this recipe at all.',
        'This recipe was a disappointment.',
        'I would not recommend this recipe.'
      );
    } else if (nasumicniBr > 3) {
      comments.push(
        'This recipe was delicious!',
        'I loved this recipe.',
        'I will definitely make this again!'
      );
    } else {
      comments.push(
        'This recipe was just okay.',
        'I had mixed feelings about this recipe.',
        'I might try this recipe again with some modifications.'
      );
    }
    var randomComment = comments[Math.floor(Math.random() * comments.length)];
    var commentElement = document.createElement('p');
    var commentElement = document.getElementsByClassName("comment-list")[0]
    commentElement.textContent = 'Random comment: ' + randomComment;
    newRecipeCard.appendChild(commentElement);
  }, 5000);
})
var broj = 0;
$(document).ready(function () {
  var button = $('#a');
  var slider = $('#slider');
  button.on('click', function (e) {
    broj++;
    if (broj > 1) {
      if (slider.hasClass('closed')) {
        button.text('Close');
        slider.toggleClass('closed');
      } else {
        button.text('Sign in');
        slider.toggleClass('closed');
      }
    }
  });
});
let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");
signinBtn.onclick = function () {
  nameField.style.maxHeight = "0";
  title.innerHTML = "Sign In";
  signupBtn.classList.add("disable");
  signinBtn.classList.remove("disable");
}
signupBtn.onclick = function () {
  nameField.style.maxHeight = "60px";
  title.innerHTML = "Sign Up";
  signupBtn.classList.remove("disable");
  signinBtn.classList.add("disable");
}