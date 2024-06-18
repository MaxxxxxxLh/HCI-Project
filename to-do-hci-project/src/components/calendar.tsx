import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import { Fragment, useState, useEffect } from 'react'
import { Box } from './boxTask'
import { TaskInterface } from '@/interfaces/TaskInterface'
import i18n from './i18n'
import { I18nextProvider,useTranslation } from 'react-i18next'
import { enUS, fr, ko, es, zhCN } from "date-fns/locale";



function classNames(...classes:any[]) {
  return classes.filter(Boolean).join(' ')
}

export const Calendar = () => {
  const { t } = useTranslation()
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  const storedTasks = localStorage.getItem("tasks");
  const tasks = storedTasks ? JSON.parse(storedTasks) : [];

  const languageLocales: { [key: string]: Locale } = {
    en: enUS,
    fr: fr,
    ko: ko, 
    es: es,
    zh: zhCN,
  };
  const currentLanguage = i18n.language;
  const locale = languageLocales[currentLanguage];
  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  const selectedDayTasks = tasks.filter((task: TaskInterface) =>
    isSameDay(task.date, selectedDay)
  );

  const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem("tasks");
    const tasks = (storedTasks ? JSON.parse(storedTasks) : []);
  };

  return (
    <>
      <div className="pt-16">
        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="md:pr-14">  
              <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900 dark:text-white">
                  {format(firstDayCurrentMonth, 'MMM-yyyy', {locale})}
                </h2>
                <button
                  type="button"
                  onClick={previousMonth}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-slate-100"
                >
                  <span className="sr-only">{t('previousMonth')}</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-slate-100"
                >
                  <span className="sr-only">{t('nextMonth')}</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500 dark:text-slate-100">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div className="grid grid-cols-7 mt-2 text-sm dark:text-white">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      'py-1.5'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={classNames(
                        isEqual(day, selectedDay) && 'text-white',
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          'text-red-500',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          'text-gray-900',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          'text-gray-400',
                        isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          'bg-gray-900',
                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          'font-semibold',
                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                      )}
                    >
                      <time dateTime={format(day, 'yyyy-MM-dd')}>
                        {format(day, 'd')}
                      </time>
                    </button>

                    <div className="w-1 h-1 mx-auto mt-1">
                      {tasks.some((task: TaskInterface) =>
                        isSameDay(task.date, day)
                      ) && (
                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <section className="mt-12 md:mt-0 md:pl-14 ">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {t('scheduleFor')}{' '}
                <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                  {format(selectedDay, 'MMM dd, yyy')}
                </time>
              </h2>
              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500 dark:text-slate-100">
                {selectedDayTasks.length > 0 ? (
                  selectedDayTasks.map((task: TaskInterface) => (
                    <Task task={task} key={task.id} />
                  ))
                ) : (
                  <p>{t('noTasks')}.</p>
                )}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

const Task = ({ task }) => {
  const { t } = useTranslation()
  return (
    <>
      <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100 dark:bg-gray-700">
        <div className="flex-auto">
          <p className="text-gray-900">{task.title}</p>
          <p className="mt-0.5">
          {task.content}
          </p>
        </div>
      </li>
    </>
    
  )
}
let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]
