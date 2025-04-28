import type { VNode } from "preact";
import type { Dispatch, StateUpdater } from "preact/hooks";

type BaseModalProps = {
  children?: VNode | VNode[];
  open: boolean;
  setOpen: Dispatch<StateUpdater<boolean>>;

  openStringCondition?: string;
  footer?: VNode | VNode[]
  isStatic?: boolean
  header?: boolean
  title?: VNode | VNode[] | string
  width?: number
  showCloseButton?: boolean
  className?: string
  separator?: boolean

  headerOverride?: Pick<BaseModalProps, 'className'>
  contentOverride?: Pick<BaseModalProps, 'className'>
  footerOverride?: Pick<BaseModalProps, 'className'>
}
