import Modal from './Modal'

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', confirmVariant = 'danger' }) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const confirmClasses = confirmVariant === 'danger' 
    ? 'bg-red-600 hover:bg-red-700 text-white' 
    : 'bg-blue-600 hover:bg-blue-700 text-white'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <p className="text-gray-600">{message}</p>
        <div className="flex space-x-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-md transition-colors ${confirmClasses}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}