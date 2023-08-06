import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

interface modalProps {
  open: boolean
  setOpen: (open: boolean) => void
  onClose: () => void
  header?: React.ReactNode
  body?: React.ReactNode
  footer?: React.ReactNode
  size: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full"
}
export const MainModal = ({ open, onClose, header, body, footer, size }: modalProps) => {

  return (
    <div>
      <Modal isCentered size={size} isOpen={open} onClose={() => onClose && onClose()}>
        <ModalOverlay />
        <ModalContent>
          {header && (
            <ModalHeader>
              {header}
            </ModalHeader>
          )}
          <ModalCloseButton />
          {body && (
            <ModalBody>
              {body}
            </ModalBody>
          )}
          {footer && (
            <ModalFooter>
              {footer}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </div>
  )

}
