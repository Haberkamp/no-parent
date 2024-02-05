import { inject, type InjectionKey, type Ref } from 'vue';

type SelectContext = {
  isOpen: Readonly<Ref<boolean>>;
  idOfSelectedOption: Readonly<Ref<string | undefined>>;
  registerOption: (id: string) => void;
  unregisterOption: (id: string) => void;
  focusOption: (id: 'first' | 'last' | 'next' | 'previous') => void;
  close: () => void;
};

export const selectInjectionKey = Symbol() as InjectionKey<SelectContext>;

export function useSelectContext() {
  const value = inject(selectInjectionKey);

  if (!value)
    throw new Error(
      'Failed to render component; Component must be child of <SelectRoot />.'
    );

  return value;
}
