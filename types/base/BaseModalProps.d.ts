import type { VNode } from "preact";
import type { StateUpdater } from "preact/hooks";

type BaseModalProps = {
  children?: VNode | VNode[];
  open: boolean;
  setOpen: StateUpdater<boolean>;

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