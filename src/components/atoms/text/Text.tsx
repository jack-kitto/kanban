import { useMemo } from "react";
import { type Colors, colors } from "~/styles";

const textTypes = ['hxl', 'hl', 'hm', 'hs', 'bl', 'bm'] as const;
export type TextType = typeof textTypes[number];
export interface TextProps {
  children?: string;
  type: TextType;
  style?: React.CSSProperties;
  text?: string;
  color?: Colors;
}

export default function Text(props: TextProps) {
  const { children, type, style, text, color } = props;

  const content = useMemo(() => {
    return children ?? text
  }, [children, text]);

  const args = useMemo(() => {
    return {
      className: `prose-${type}`,
      style: {
        color: colors[color ?? 'black'],
        ...style,
      }
    }
  }, [type, color, style]);

  if (!textTypes.includes(type)) {
    throw new Error(`Invalid text type: ${type}`);
  }

  if (!children && !text) {
    throw new Error('Text component must have children or text prop');
  }

  if (text && children) {
    throw new Error('Text component must have either children or text prop, not both');
  }

  if (type === 'hxl') {
    return (
      <h1 {...args}>
        {content}
      </h1>
    );
  }

  if (type === 'hl') {
    return (
      <h2 {...args}>
        {content}
      </h2>
    );
  }

  if (type === 'hm') {
    return (
      <h3 {...args}>
        {content}
      </h3>
    );
  }

  if (type === 'hs') {
    return (
      <h4 {...args}>
        {content}
      </h4>
    );
  }

  if (type === 'bl') {
    return (
      <p {...args}>
        {content}
      </p>
    );
  }

  if (type === 'bm') {
    return (
      <p {...args}>
        {content}
      </p>
    );
  }

  return null
}
