import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useStores } from '~/models'
import { colors } from '~/styles/colors'

interface modalProps {
  open: boolean
  setOpen: (open: boolean) => void
  onClose: () => void
  header?: React.ReactNode
  body?: React.ReactNode
  footer?: React.ReactNode
  size: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full"
}
export const MainModal = observer(({ open, onClose, header, body, footer, size }: modalProps) => {
  const { theme } = useStores()
  return (
    <div>
      <Modal isCentered size={size} isOpen={open} onClose={() => onClose && onClose()}>
        <ModalOverlay />
        <ModalContent style={{ backgroundColor: theme.darkMode ? colors.darkGrey : 'white' }}>
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

})
