// Fetch the JSON data
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const tasks = Object.keys(data['2023/7/4']);

    tasks.forEach(task => {
      const squares = document.createElement('ul');
      squares.classList.add('squares');

      const graphContainer = document.createElement('div');
      graphContainer.classList.add('graph');

      const heading = document.createElement('h2');
      heading.textContent = task;
      graphContainer.appendChild(heading);

      graphContainer.appendChild(squares);

      document.body.appendChild(graphContainer);

      // Iterate over the dates from July 4, 2023, to July 4, 2024
      const startDate = new Date('2023-07-04');
      const endDate = new Date('2024-07-04');
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dateKey = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
        const tasksForDate = data[dateKey] || {};
        const taskStatus = tasksForDate[task];
        const isCompleted = taskStatus === true;

        // Set the color level based on task completion
        let level = 0;
        if (isCompleted) {
          level = 3; // Completed (green block)
        } else if (taskStatus !== undefined) {
          level = 1; // Incomplete (red block)
        } else {
          level = 0; // Future date (gray block)
        }

        squares.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
  });
