export interface INotification {
  postNotification?: PostNotification
}

export interface PostNotification extends Notification {
  type: NotificationType.POST_NOTIFICATION
  id: string
  uploading: boolean
}

export enum NotificationType {
  POST_NOTIFICATION = 'postNotification'
}
