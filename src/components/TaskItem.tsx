import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen/pen.png';
import { Task } from './TasksList';

interface TasksItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}

const TaskItem = ({
  task,
  editTask,
  removeTask,
  toggleTaskDone,
  index,
}: TasksItemProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [taskTitle, setTaskTitle] = React.useState(task.title);
  const textInputRef = React.useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, taskTitle);
    setIsEditing(false);
  }

  React.useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current?.focus();
      } else {
        textInputRef.current?.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={[styles.taskMarker, task.done && styles.taskMarkerDone]}
          >
            {task.done && <Icon name='check' size={12} color='#FFF' />}
          </View>

          <TextInput
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
            style={styles.taskCancelButton}
          >
            <Icon name='x' size={24} color='#B2B2B2' />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={handleStartEditing}
              style={styles.taskIconButton}
            >
              <Image source={penIcon} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.taskIconButton}
              onPress={() => removeTask(task.id)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  separator: {
    height: 24,
    width: 1,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 5,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIconButton: {
    padding: 15,
  },
  taskCancelButton: {
    marginHorizontal: 60,
    padding: 15,
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
});

export default TaskItem;
