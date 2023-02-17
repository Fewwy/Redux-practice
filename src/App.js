import React from 'react';
import TasksPage from './components/PresentationalComponents/TasksPage';
import { connect } from 'react-redux';
import { createTask, editTask, fetchTasks } from './store/actions';
import FlashMessage from './components/PresentationalComponents/FlashMessage';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks());
  }
  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  };
  onStatusChange = (id, status) => {
    this.props.dispatch(editTask(id, { status }));
  };

  render() {
    return (
      <div className="container">
        {this.props.error && <FlashMessage message={this.props.error} />}
        <div className="main-content">
          <TasksPage
            tasks={this.props.tasks}
            onCreateTask={this.onCreateTask}
            onStatusChange={this.onStatusChange}
            isLoading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tasks, isLoading, error } = state.tasks;
  return {
    tasks: { tasks, isLoading, error },
  };
}

export default connect(mapStateToProps)(App);
