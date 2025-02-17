//your code here

// Get the images and buttons
const images = document.querySelectorAll('img');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const message = document.getElementById('h');
const resultMessage = document.getElementById('para');

// Define the image sources
const imageSources = [
  'https://picsum.photos/id/237/200/300',
  'https://picsum.photos/seed/picsum/200/300',
  'https://picsum.photos/200/300?grayscale',
  'https://picsum.photos/200/300/',
  'https://picsum.photos/200/300.jpg'
];

// Define the selected images
let selectedImages = [];

// Function to shuffle the images
function shuffleImages() {
  // Create a copy of the image sources array
  const shuffledSources = [...imageSources];

  // Randomly select an image to repeat
  const repeatedImageIndex = Math.floor(Math.random() * shuffledSources.length);
  const repeatedImageSource = shuffledSources[repeatedImageIndex];

  // Add the repeated image to the shuffled array
  shuffledSources.push(repeatedImageSource);

  // Shuffle the array
  for (let i = shuffledSources.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledSources[i], shuffledSources[j]] = [shuffledSources[j], shuffledSources[i]];
  }

  // Set the image sources
  images.forEach((image, index) => {
    image.src = shuffledSources[index];
  });
}

// Function to handle image clicks
function handleImageClick(event) {
  // Get the clicked image
  const clickedImage = event.target;

  // Add the clicked image to the selected images array
  selectedImages.push(clickedImage);

  // Add the selected class to the clicked image
  clickedImage.classList.add('selected');

  // Show the reset button
  resetButton.style.display = 'block';

  // If two images are selected, show the verify button
  if (selectedImages.length === 2) {
    verifyButton.style.display = 'block';
  }
}

// Function to handle reset button clicks
function handleResetButtonClick() {
  // Remove the selected class from all images
  images.forEach(image => {
    image.classList.remove('selected');
  });

  // Hide the reset and verify buttons
  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';

  // Reset the selected images array
  selectedImages = [];

  // Shuffle the images again
  shuffleImages();
}

// Function to handle verify button clicks
function handleVerifyButtonClick() {
  // Get the sources of the selected images
  const selectedImageSources = selectedImages.map(image => image.src);

  // Check if the selected images are identical
  if (selectedImageSources[0] === selectedImageSources[1]) {
    resultMessage.textContent = 'You are a human. Congratulations!';
  } else {
    resultMessage.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  // Hide the verify button
  verifyButton.style.display = 'none';
}

// Add event listeners to the images and buttons
images.forEach(image => {
  image.addEventListener('click', handleImageClick);
});

resetButton.addEventListener('click', handleResetButtonClick);

verifyButton.addEventListener('click', handleVerifyButtonClick);

// Shuffle the images initially
shuffleImages();

