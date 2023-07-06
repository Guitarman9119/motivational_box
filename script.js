function processTasks() {
  return fetch('static/db.json')
    .then(response => response.json())
    .then(tasks => {
      const taskArrays = {
        'Task 1': new Array(365).fill(0),
        'Task 2': new Array(365).fill(0),
        'Task 3': new Array(365).fill(0),
        'Task 4': new Array(365).fill(0),
        'Task 5': new Array(365).fill(0)
      };

      for (const date in tasks) {
        const currentDate = new Date(date);
        const dayOfYear = getDayOfYear(currentDate);

        for (const task in tasks[date]) {
          if (taskArrays.hasOwnProperty(task) && tasks[date][task]) {
            taskArrays[task][dayOfYear] = 3;
          }
        }
      }

      return taskArrays;
    })
    .catch(error => {
      console.error('Error:', error);
      return {};
    });
}

// Helper function to get the day of the year
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Usage example
processTasks()
  .then(taskArrays => {
    for (const task in taskArrays) {
      const squares = document.querySelector(`.squares.${task.toLowerCase().replace(' ', '')}`);
      const taskArray = taskArrays[task];
      
      for (let i = 1; i < taskArray.length; i++) {
        const level = taskArray[i];
        squares.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);
      }
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
