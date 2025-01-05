import { z } from 'zod';

const bookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: '책 제목은 필수값입니다.' })
    .max(255, { message: '책 제목은 최대 255자까지만 가능합니다.' }),
  author: z
    .string()
    .trim()
    .min(1, { message: '저자는 필수값입니다.' })
    .max(100, { message: '저자 이름은 최대 100자까지만 가능합니다.' }),
  publisher: z
    .string()
    .trim()
    .min(1, { message: '출판사는 필수값입니다.' })
    .max(100, { message: '출판사 이름은 최대 100자까지만 가능합니다.' }),
  description: z
    .string()
    .trim()
    .max(500, { message: '설명은 최대 500자까지만 가능합니다.' })
    .optional(),
  price: z
    .number()
    .int({ message: '가격은 정수여야 합니다.' })
    .nonnegative({ message: '가격은 0 이상이어야 합니다.' })
    .optional(),
  stock: z
    .number()
    .int({ message: '재고 수량은 정수여야 합니다.' })
    .nonnegative({ message: '재고 수량은 0 이상이어야 합니다.' })
    .optional(),
});

export { bookSchema };
