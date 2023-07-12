/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('evaluations').del()
  await knex('evaluations').insert([
    {
      work_performance: 5,
      work_performance_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      followership_leadership: 4,
      followership_leadership_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      professional_development: 4,
      professional_development_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      self_improvement: 5,
      self_improvement_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      passing_fitness: true,
      fitness_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi.',
      eval_date: '2022-05-01',
      user_id: BigInt(1234567890),
    },
    {
      work_performance: 4,
      work_performance_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      followership_leadership: 5,
      followership_leadership_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      professional_development: 4,
      professional_development_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      self_improvement: 5,
      self_improvement_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      passing_fitness: true,
      fitness_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi.',
      eval_date: '2022-04-22',
      user_id: BigInt(1234567891),
      supervisor_id: BigInt(1234567890)
    },
    {
      work_performance: 2,
      work_performance_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      followership_leadership: 2,
      followership_leadership_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien..',
      professional_development: 3,
      professional_development_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien..',
      self_improvement: 5,
      self_improvement_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      passing_fitness: false,
      fitness_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl.',
      eval_date: '2022-08-01',
      user_id: BigInt(1234567892),
      supervisor_id: BigInt(1234567890)
    },
    {
      work_performance: 4,
      work_performance_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      followership_leadership: 5,
      followership_leadership_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      professional_development: 4,
      professional_development_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      self_improvement: 5,
      self_improvement_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullamcorper nisl mi, quis interdum tellus tincidunt sed. Sed pretium, sem id consequat sagittis, risus nisi ultrices tellus, et dictum lectus nulla eget arcu. Suspendisse volutpat urna ipsum, id mollis odio viverra eget. Nunc venenatis venenatis tristique. Cras congue interdum placerat. Praesent fringilla justo vitae neque blandit, nec consectetur quam tincidunt. Mauris at est sapien.',
      passing_fitness: true,
      fitness_comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque felis odio, sed tristique erat blandit a. Etiam ullam.',
      eval_date: '2022-12-07',
      user_id: BigInt(1234567893),
      supervisor_id: BigInt(1234567890)
    },
    {
      work_performance: null,
      work_performance_comments: '',
      followership_leadership: null,
      followership_leadership_comments: '',
      professional_development: null,
      professional_development_comments: '',
      self_improvement: null,
      self_improvement_comments: '',
      passing_fitness: true,
      fitness_comments: '',
      eval_date: new Date(),
    }
  ]);
};
