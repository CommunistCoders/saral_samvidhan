using UnityEngine;

public class CheckPointSystem : MonoBehaviour
{
    public GameObject[] checkpoints; // Array of checkpoint GameObjects
    public GameObject[] trafficLights;
    public ArrowController arrowController;
    private int currentCheckpointIndex = 0;
    public float trafficViolations = 0;

    void Start()
    {
        // Deactivate all checkpoints initially, except the first one
        for (int i = 0; i < checkpoints.Length; i++)
        {
            checkpoints[i].SetActive(i == currentCheckpointIndex);
        }
        arrowController.target = checkpoints[currentCheckpointIndex].GetComponent<Transform>();
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Checkpoint"))
        {
            // Update the last checkpoint position
            Debug.Log("Checkpoint :" + (currentCheckpointIndex + 1));

            TrafficLight tl = trafficLights[currentCheckpointIndex].GetComponent<TrafficLight>();
            if (tl != null)
            {
                if (tl.isRed)
                {
                    trafficViolations += 1;
                }
            }
            // Deactivate the current checkpoint
            checkpoints[currentCheckpointIndex].SetActive(false);

            // Move to the next checkpoint
            currentCheckpointIndex++;

            // Activate the next checkpoint if it exists
            if (currentCheckpointIndex < checkpoints.Length)
            {
                arrowController.target = checkpoints[currentCheckpointIndex].GetComponent<Transform>();
                checkpoints[currentCheckpointIndex].SetActive(true);
            }
        }
    }
}
