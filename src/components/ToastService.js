import Toast from 'react-native-root-toast';

export const showToast = (message, actionType, maxChars) => {
  if (message.length > maxChars) {
    message = message.substring(0, maxChars) + '...';
  }

  let actionMessage = '';

  if (actionType === 'delete') {
    actionMessage = 'silindi';
  } else if (actionType === 'addFavorite') {
    actionMessage = 'favorilere eklendi';
  }else if (actionType === 'removeFavorite') {
    actionMessage = 'favorilerden kaldırıldı.';
  }

  Toast.show(message + ' ' + actionMessage, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};