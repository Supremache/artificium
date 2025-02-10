import * as React from "react";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarProps = React.ComponentProps<typeof Avatar>;

interface AvatarGroupProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  max?: number;
  classNameAvatar?: string;
}

export const AvatarGroup = ({
  children,
  max,
  className,
  classNameAvatar,
  ...props
}: AvatarGroupProps) => {
  const validAvatars = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child) && child.type === Avatar
  ) as React.ReactElement<AvatarProps>[];

  const totalAvatars = validAvatars.length;
  const displayedAvatars = validAvatars.slice(0, max).reverse();
  const remainingAvatars = max ? Math.max(totalAvatars - max, 0) : 0;

  return (
    <div className={cn("flex items-center flex-row-reverse", className)} {...props}>
      {remainingAvatars > 0 && (
        <Avatar className={cn("-ml-2 hover:z-10 relative ring-8 ring-background rounded-xl", classNameAvatar)}>
          <AvatarFallback className="bg-background text-muted-foreground rounded-xl">
            +{remainingAvatars}
          </AvatarFallback>
        </Avatar>
      )}
      {displayedAvatars.map((avatar, index) =>
        React.cloneElement(avatar, {
          key: index,
          className: cn(avatar.props.className, "ring-8 ring-background -ml-2 hover:z-10 relative", classNameAvatar),
        })
      )}
    </div>
  );
};

