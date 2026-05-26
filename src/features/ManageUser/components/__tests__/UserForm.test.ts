import { mount } from '@vue/test-utils';
import { describe, expect, it, } from 'vitest';
import UserForm from '../UserForm.vue';

const globalStubs = {
  InputText: {
    template: '<input :id="$attrs.id" :disabled="$attrs.disabled" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
    props: ['modelValue'],
    emits: ['update:modelValue'],
  },
  Button: {
    template: '<button :type="type || \'button\'" :disabled="disabled" @click="$emit(\'click\')">{{ label }}</button>',
    props: ['label', 'type', 'disabled', 'loading', 'text'],
    emits: ['click'],
  },
  Message: {
    template: '<div class="message"><slot /></div>',
    props: ['severity', 'closable'],
  },
};

describe('UserForm', () => {
  it('renders all three fields', () => {
    const wrapper = mount(UserForm, { global: { stubs: globalStubs } });

    expect(wrapper.find('#firstName').exists()).toBe(true);
    expect(wrapper.find('#lastName').exists()).toBe(true);
    expect(wrapper.find('#email').exists()).toBe(true);
  });

  it('does not emit submit when fields are empty', async () => {
    const wrapper = mount(UserForm, { global: { stubs: globalStubs } });

    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('submit')).toBeUndefined();
  });

  it('does not emit submit when email is not @epam.com', async () => {
    const wrapper = mount(UserForm, { global: { stubs: globalStubs } });

    await wrapper.find('#firstName').setValue('Alex');
    await wrapper.find('#lastName').setValue('Nguyen');
    await wrapper.find('#email').setValue('alex@gmail.com');
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('submit')).toBeUndefined();
  });

  it('emits submit with correct values when form is valid', async () => {
    const wrapper = mount(UserForm, { global: { stubs: globalStubs } });

    await wrapper.find('#firstName').setValue('Alex');
    await wrapper.find('#lastName').setValue('Nguyen');
    await wrapper.find('#email').setValue('alex.nguyen@epam.com');
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0][0]).toEqual({
      firstName: 'Alex',
      lastName: 'Nguyen',
      email: 'alex.nguyen@epam.com',
    });
  });

  it('resets form fields when Reset button is clicked', async () => {
    const wrapper = mount(UserForm, { global: { stubs: globalStubs } });

    await wrapper.find('#firstName').setValue('Alex');
    await wrapper.find('#lastName').setValue('Nguyen');
    await wrapper.find('#email').setValue('alex.nguyen@epam.com');

    const resetBtn = wrapper.findAll('button').find((b) => b.text() === 'Reset');
    await resetBtn!.trigger('click');

    expect((wrapper.find('#firstName').element as HTMLInputElement).value).toBe('');
    expect((wrapper.find('#lastName').element as HTMLInputElement).value).toBe('');
    expect((wrapper.find('#email').element as HTMLInputElement).value).toBe('');
  });

  it('emits cancel when Cancel button is clicked', async () => {
    const wrapper = mount(UserForm, { global: { stubs: globalStubs } });

    const cancelBtn = wrapper.findAll('button').find((b) => b.text() === 'Cancel');
    await cancelBtn!.trigger('click');

    expect(wrapper.emitted('cancel')).toHaveLength(1);
  });

  it('disables all buttons when loading prop is true', () => {
    const wrapper = mount(UserForm, {
      props: { loading: true },
      global: { stubs: globalStubs },
    });

    const buttons = wrapper.findAll('button');
    buttons.forEach((btn) => {
      expect(btn.attributes('disabled')).toBeDefined();
    });
  });

  it('disables submit button when disabled prop is true', () => {
    const wrapper = mount(UserForm, {
      props: { disabled: true },
      global: { stubs: globalStubs },
    });

    const submitBtn = wrapper.findAll('button').find((b) => b.text() === 'Create user');
    expect(submitBtn!.attributes('disabled')).toBeDefined();
  });

  it('shows email error message for non-epam address', async () => {
    const wrapper = mount(UserForm, { global: { stubs: globalStubs } });

    await wrapper.find('#email').setValue('user@gmail.com');

    expect(wrapper.find('.message').exists()).toBe(true);
    expect(wrapper.find('.message').text()).toContain('@epam.com');
  });

  it('does not show email error when field is empty (pristine state)', () => {
    const wrapper = mount(UserForm, { global: { stubs: globalStubs } });

    expect(wrapper.find('.message').exists()).toBe(false);
  });
});
