import Vue from 'vue'
import VueRouter from 'vue-router'
import RegisterPage from '@/views/RegisterPage'
import { mount, createLocalVue } from '@vue/test-utils'

describe('RegisterPage.vue', () => {
    let wrapper;
    let fieldUsername;
    let fieldEmailAddress;
    let fieldPassword;
    let buttonSubmit;
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()

    jest.mock('@/services/registration')

    beforeEach(() => {
        wrapper = mount(RegisterPage, {
            localVue, router
        })
        fieldUsername = wrapper.find('#username')
        fieldEmailAddress = wrapper.find('#emailAddress')
        fieldPassword = wrapper.find('#password')
        buttonSubmit = wrapper.find('form button[type="submit"]')
    })

    it('should render correct content', () => {
        const Constructor = Vue.extend(RegisterPage)
        const vm = new Constructor().$mount()
        expect(wrapper.find('.logo').attributes().src)
            .toEqual('../assets/logo.png')
        expect(wrapper.find('.tagline').text())
            .toEqual('Open source task management tool')
        expect(fieldUsername.element.value).toEqual('')
        expect(fieldEmailAddress.element.value).toEqual('')
        expect(fieldPassword.element.value).toEqual('')
        expect(buttonSubmit.text()).toEqual('Create account');
    })

    it('should contain data model with initial value', () => {
        expect(wrapper.vm.form.username).toEqual('')
        expect(wrapper.vm.form.emailAddress).toEqual('')
        expect(wrapper.vm.form.password).toEqual('')

    })

    it ('should have form inputs bound with data model', () => {
        const username = 'sunny'
        const emailAddress = 'sunny@local.com'
        const password = 'VueJSRock'

        wrapper.vm.form.username = username
        wrapper.vm.form.emailAddress = emailAddress
        wrapper.vm.form.password = password
        expect(wrapper.vm.form.username).toEqual(username)
        expect(wrapper.vm.form.emailAddress).toEqual(emailAddress)
        expect(wrapper.vm.form.password).toEqual(password)
    })

    it ('should have form submit event handler Submit Form', () => {
        const stub = jest.fn()
        wrapper.setMethods({submitForm: stub})
        buttonSubmit.trigger('submit')
        expect(stub).toBeCalled()
    })

    it ('should register when it is a new user', () => {
        const stub = jest.fn()
        wrapper.vm.$router.push = stub
        wrapper.vm.form.username = 'sunny'
        wrapper.vm.form.emailAddress = 'sunny@local'
        wrapper.vm.form.password = 'Jest!'
        wrapper.vm.submitForm()
        
        wrapper.vm.$nextTick(() => {
            expect(stub).toHaveBeenCalledWith({name:'LoginPage'})
        })
    })

    it ('should fail it is not a new user', () => {
        wrapper.vm.form.emailAddress = 'ted@local'
        expect(wrapper.find('.failed').isVisible()).toBe(false)
        wrapper.vm.submitForm()
        wrapper.vm.$nextTick(null, () => {
            expect(wrapper.find('.failed').isVisible()).toBe(true)
        })
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })
})