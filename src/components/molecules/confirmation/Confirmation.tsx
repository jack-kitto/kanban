import { Button } from "~/components/atoms";

export interface ConfirmationProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function Confirmation(props: ConfirmationProps): JSX.Element {
  return (
    <div className="min-w-80 bg-white max-w-lg dark:bg-veryDarkGray px-8 md:py:10 rounded-md">
      <h2 className="prose-hl text-red py-6">{props.title}</h2>
      <p className="prose-bl text-mediumGray">{props.message}</p>
      <div className="flex gap-4 py-6">
        <Button btn={{ onClick: props.onConfirm }} type="destructive" text={props.confirmText} />
        <Button btn={{ onClick: props.onCancel }} type="secondary" text={props.cancelText} />
      </div>
    </div>
  );
}
