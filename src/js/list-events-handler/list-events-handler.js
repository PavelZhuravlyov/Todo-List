import events from '../events';

class ListEventHandler {
  constructor(listInstance) {
    this.listInstance = listInstance;
  }

  initHandlers() {
    document.addEventListener(events.removeTask, (event) => {
      const { detail } = event;
      const { taskId } = detail;

      this.listInstance.removeTask(taskId);
    });

    document.addEventListener(events.addTask, (event) => {
      const { detail } = event;
      const { taskName } = detail;

      this.listInstance.addTask({ name: taskName });
    });

    document.addEventListener(events.editTask, (event) => {
      const { detail:newTaskData } = event;
      this.listInstance.editTask(newTaskData);
    });

    document.addEventListener(events.completeTask, () => {
      this.listInstance.renderList();
    });

    document.addEventListener(events.changeTaskPriority, (event) => {
      const { detail } = event;
      const { id, priorityCount } = detail;

      this.listInstance.changeTaskPriority(id, priorityCount);
    });
  }
}

export default ListEventHandler;