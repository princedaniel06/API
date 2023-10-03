document.addEventListener("DOMContentLoaded", () => {
  const retrieveButton = document.querySelector("button:nth-of-type(1)");
  const createButton = document.querySelector("button:nth-of-type(2)");
  const updateButton = document.querySelector("button:nth-of-type(3)");
  const deleteButton = document.querySelector("button:nth-of-type(4)");
  const table = document.querySelector("table");

  // Function to retrieve data from the API (HTTP GET)
  retrieveButton.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        // Clear existing table data
        table.innerHTML = `
          <tr>
            <th style="width: 100px;">USER ID</th>
            <th style="width: 100px;">ID</th>
            <th>TITLE</th>
            <th>BODY</th>
          </tr>
        `;

        // Populate the table with fetched data
        data.forEach((post) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${post.userId}</td>
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.body}</td>
          `;
          table.appendChild(row);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  });

  // Function to create new data (HTTP POST)
  createButton.addEventListener("click", () => {
    const newPost = {
      userId: 1, // You can change this to any desired user ID
      title: "New Post",
      body: "This is the body of the new post.",
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New post created:", data);
      })
      .catch((error) => console.error("Error creating new post:", error));
  });

  // Function to update existing data (HTTP PUT)
  updateButton.addEventListener("click", () => {
    const updatedPost = {
      id: 1, // Replace with the ID of the post you want to update
      userId: 1, // You can change this to any desired user ID
      title: "Updated Post",
      body: "This is the updated body of the post.",
    };

    fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post updated:", data);
      })
      .catch((error) => console.error("Error updating post:", error));
  });

  // Function to delete data (HTTP DELETE)
  deleteButton.addEventListener("click", () => {
    const postIdToDelete = 1; // Replace with the ID of the post you want to delete

    fetch(`https://jsonplaceholder.typicode.com/posts/${postIdToDelete}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(`Post with ID ${postIdToDelete} deleted successfully.`);
        } else {
          console.error(`Error deleting post with ID ${postIdToDelete}`);
        }
      })
      .catch((error) => console.error("Error deleting post:", error));
  });
});
