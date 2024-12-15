"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import styles from "./modal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  //openModal로 여는 형태가 아니라, 외부에서 라우팅으로 접근하기 때문에 렌더링시 true로 전환
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      // 라우팅 되기 전에 애니메이션 할 딜레이 부여
      setTimeout(() => {
        router.back();
      }, 300);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <VisuallyHidden>
              <Dialog.Title>Modal</Dialog.Title>
            </VisuallyHidden>
            <Dialog.Overlay className={styles.overlay} />
            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.div
                className={styles.content}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{
                  type: "spring",
                  duration: 0.3,
                  bounce: 0.2,
                }}
              >
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
