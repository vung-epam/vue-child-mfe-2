import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import BulkPage from '../Bulk.Page.vue';

const pushMock = vi.fn();
const mutateMock = vi.fn();
const isPending = ref(false);

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock('../../queries/user.queries', () => ({
  useCreateUsersBulk: () => ({ mutate: mutateMock, isPending }),
}));

const globalStubs = {
  Toolbar: {
    template: '<div><slot /><slot name="start" /><slot name="end" /></div>',
  },
  Card: {
    template:
      '<div><slot /><slot name="title" /><slot name="subtitle" /><slot name="content" /></div>',
  },
  Divider: { template: '<hr />' },
  Message: {
    template: '<div class="message"><slot /></div>',
    props: ['severity', 'closable'],
  },
  Button: {
    template:
      '<button :disabled="disabled" @click="$emit(\'click\')">{{ label }}</button>',
    props: ['label', 'disabled', 'loading', 'text'],
    emits: ['click'],
  },
};

const setNavigatorOnline = (value: boolean) => {
  Object.defineProperty(navigator, 'onLine', {
    configurable: true,
    value,
  });
};

describe('BulkPage', () => {
  beforeEach(() => {
    mutateMock.mockReset();
    pushMock.mockReset();
    setNavigatorOnline(true);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('disables submit when offline', async () => {
    setNavigatorOnline(false);

    const wrapper = mount(BulkPage, { global: { stubs: globalStubs } });

    await nextTick();

    const submitBtn = wrapper
      .findAll('button')
      .find((btn) => btn.text().includes('Submit'));

    expect(submitBtn?.attributes('disabled')).toBeDefined();
    expect(wrapper.text()).toContain('Network appears offline');
  });

  it('navigates to list on successful submission', async () => {
    vi.useFakeTimers();
    mutateMock.mockImplementation((_payload, options) => {
      options?.onSuccess?.([]);
    });

    const wrapper = mount(BulkPage, { global: { stubs: globalStubs } });

    await wrapper
      .find('textarea')
      .setValue('firstName,lastName,email\nJane,Doe,jane.doe@epam.com');
    await nextTick();

    const submitBtn = wrapper
      .findAll('button')
      .find((btn) => btn.text().includes('Submit'));

    await submitBtn?.trigger('click');
    vi.runAllTimers();

    expect(pushMock).toHaveBeenCalledWith({ name: 'list-user' });
  });

  it('shows error message on failed submission', async () => {
    mutateMock.mockImplementation((_payload, options) => {
      options?.onError?.(new Error('boom'));
    });

    const wrapper = mount(BulkPage, { global: { stubs: globalStubs } });

    await wrapper
      .find('textarea')
      .setValue('firstName,lastName,email\nJane,Doe,jane.doe@epam.com');
    await nextTick();

    const submitBtn = wrapper
      .findAll('button')
      .find((btn) => btn.text().includes('Submit'));

    await submitBtn?.trigger('click');

    expect(wrapper.text()).toContain('Bulk creation failed');
  });
});
