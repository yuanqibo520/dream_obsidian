type AvatarProps = {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-8 w-8",
  md: "h-11 w-11",
  lg: "h-16 w-16",
};

export function Avatar({ src, alt, size = "md" }: AvatarProps) {
  return <img className={`${sizes[size]} rounded-full border border-white/80 bg-white object-cover`} src={src} alt={alt} />;
}
