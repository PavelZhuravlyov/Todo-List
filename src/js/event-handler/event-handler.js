import events from '../events';

class EventHandler {
  static removeTask(taskId) {
    const event = new CustomEvent(events.removeTask, {
      detail: {
        taskId
      }
    });
    document.dispatchEvent(event);
  }

  static addTask(taskName) {
    const event = new CustomEvent(events.addTask, {
      detail: {
        taskName
      }
    });
    document.dispatchEvent(event);
  }

  static editTask(taskData) {
    const event = new CustomEvent(events.editTask, {
      detail: taskData
    });
    document.dispatchEvent(event);
  }

  static completeTask() {
    const event = new CustomEvent(events.completeTask);
    document.dispatchEvent(event);
  }

  static changeTaskPriority(taskId, priorityCount) {
    const event = new CustomEvent(events.changeTaskPriority, {
      detail: {
        id: taskId,
        priorityCount
      }
    });
    document.dispatchEvent(event);
  }
}

export default EventHandler;